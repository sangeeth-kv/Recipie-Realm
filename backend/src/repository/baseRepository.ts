    import { Document, Model } from "mongoose";
    import { IBaseRepository } from "../interface/IBaseRepository";


    export class BaseRepository<T extends Document> implements IBaseRepository<T>{
        protected _model:Model<T>;

        constructor(model:Model<T>){
            this._model=model
        }

        async create(item: Partial<T>): Promise<T> {
            return this._model.create(item)
        }

        async findById(id: string): Promise<T | null> {
            return await this._model.findById(id).exec()
        }

        async findOne(filter: any): Promise<T | null> {
            return this._model.findOne(filter).exec()
        }

        async find(filter:any): Promise<T[]>  {
            return await this._model.find(filter).exec();
        }
        
        async delete(id: string): Promise<boolean> {
            const result = await this._model.findByIdAndDelete(id).exec();
            return !!result;
        }

        async update(id: string, item: Partial<T>): Promise<T | null> {
            return await this._model.findByIdAndUpdate(id, item, { new: true , runValidators: true }).exec();
        }

        

    }