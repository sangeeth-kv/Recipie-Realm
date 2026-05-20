import { RequestHandler } from "express";

export interface IUploader{
    single(fieldName:string):RequestHandler;
    multiple(fieldName:string,maxCount:number):RequestHandler;
}