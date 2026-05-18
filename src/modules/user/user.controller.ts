import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";
import sendResponse from "../../utility/sendResponse";

const createUser = async (req: Request, res: Response) => {
  // console.log(req.body);

  //   const { name, email, password, age } = req.body;

  try {
    const result = await userService.createUserIntoDB(req.body);

    // console.log(result);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User Created Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  console.log("Controller", req.user);
  try {
    const result = await userService.getAllUserFromDB();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users Retrieved Successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await userService.getSingleUserFromDB(id as string);

    if (result.rows.length === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User Not found",
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users Retrieved Successfully!",
      data: result.rows[0],
    });

    // console.log(result);
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const UpdateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  //   const { name, password, age, is_active } = req.body;

  // console.log({name,password,age,is_active,id})

  try {
    const result = await userService.updateUserFromDB(req.body, id as string);

    if (result.rows.length === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User Not found",
      });
    }
    // console.log(result);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Updated Successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await userService.deleteUserFromDB(id as string);

    if (result.rowCount === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User Not found",
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Delete Successfully!",
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  UpdateUser,
  deleteUser,
};
