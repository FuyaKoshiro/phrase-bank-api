import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { validateAuthentication } from "./validateAuthentication";

const mockedRequest = (headers: any): Partial<Request> => ({
  headers,
  body: {},
});

const mockedResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res as Response;
};

const mockNext: NextFunction = jest.fn();

describe("validateAuthentication Middleware", () => {
  it("given valid token, next() is called and userId is added to req.body", async () => {
    const mockedVerifyIdTokenFn = jest.fn().mockResolvedValue({ uid: "12345" });
    const req = mockedRequest({ authorization: "Bearer validtoken123" });
    const res = mockedResponse();

    await validateAuthentication(
      req as Request,
      res as Response,
      mockNext,
      mockedVerifyIdTokenFn
    );

    expect(mockNext).toHaveBeenCalled();
    expect(req.body.userId).toEqual("12345");
  });

  it("given a valida token, and there is already data in req.body, userId is added to req.body", async () => {
    const mockedVerifyIdTokenFn = jest.fn().mockResolvedValue({ uid: "12345" });
    const mockedRequest = (headers: any): Partial<Request> => ({
      headers,
      body: { data: "data" },
    });

    const req = mockedRequest({
      authorization: "Bearer validtoken123",
    });

    const res = mockedResponse();

    await validateAuthentication(
      req as Request,
      res as Response,
      mockNext,
      mockedVerifyIdTokenFn
    );

    expect(mockNext).toHaveBeenCalled();
    expect(req.body.data).toEqual("data");
    expect(req.body.userId).toEqual("12345");
  });

  it("given no token, throw", async () => {
    const mockedVerifyIdTokenFn = jest.fn();
    const req = mockedRequest({});
    const res = mockedResponse();

    await validateAuthentication(
      req as Request,
      res as Response,
      mockNext,
      mockedVerifyIdTokenFn
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalled();
  });

  it("given an invalid token, throw", async () => {
    const mockedVerifyIdTokenFn = jest
      .fn()
      .mockRejectedValue(new Error("Unauthorized: Verification failed"));
    const req = mockedRequest({ authorization: "Bearer invalid" });
    const res = mockedResponse();

    await validateAuthentication(
      req as Request,
      res as Response,
      mockNext,
      mockedVerifyIdTokenFn
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalled();
  });
});
