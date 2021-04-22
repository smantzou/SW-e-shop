/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import HttpException from '../exceptions/HttpException';
import productModel from '../models/product';
import * as express from 'express';
import CreateProductDto from '../dtos/product';
import ProductWithSameTitleExistsException from '../exceptions/ProductWithSameTitleExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import RequestWithProduct from '../interfaces/requestWithProduct';
import NotFoundException from '../exceptions/NotFoundException';

const getAllProducts = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  try {
    const products = await productModel.find();
    return response.status(200).json({
      Prodcuts: products,
    });
  } catch (error) {
    return next(new HttpException(500, 'Internal Server Error'));
  }
};

const createAProduct = async (request: RequestWithProduct, response: express.Response, next: express.NextFunction) => {
  try {
    const productData: CreateProductDto = request.body;
    if (await productModel.findOne({ title: productData.title })) {
      return next(new ProductWithSameTitleExistsException(productData.title));
    } else {
      await productModel.create({
        ...productData,
      });
      return response.status(200).json({
        Product: productData,
      });
    }
  } catch (error) {
    return next(new HttpException(500, 'Internal Server Error'));
  }
};

const getProductById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  try {
    const _id = request.params.id;
    const product = await productModel.findOne({ _id });
    if (!product) {
      return next(new NotFoundException());
    }
    return response.status(200).json({
      product,
    });
  } catch (error) {
    return next(new WrongCredentialsException());
  }
};

const modifyProduct = async (request: RequestWithProduct, response: express.Response, next: express.NextFunction) => {
  try {
    const productData: CreateProductDto = request.body;
    const _id: string = request.params.id;
    const productToModify = await productModel.findById({ _id });
    const numberOfEntriesWithThisTitle: number = await productModel.countDocuments({
      title: productData.title,
    });

    if (numberOfEntriesWithThisTitle >= 1 && productData.title !== productToModify.title) {
      return next(new ProductWithSameTitleExistsException(productData.title));
    }
    await productModel.findByIdAndUpdate({ _id }, productData);
    return response.status(200).json({
      message: 'Product updated successfully!',
    });
  } catch (error) {
    return next(new HttpException(500, 'Internal Server Error'));
  }
};

const deleteAProduct = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  try {
    const _id = request.params.id;
    await productModel.findByIdAndDelete({ _id });
    return response.sendStatus(200);
  } catch (error) {
    return next(new WrongCredentialsException());
  }
};

export { getAllProducts, createAProduct, getProductById, modifyProduct, deleteAProduct };
