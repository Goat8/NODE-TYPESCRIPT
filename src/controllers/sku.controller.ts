import { Request, Response } from "express";
import { Service } from "typedi";
import {
	StatusCodes,
} from 'http-status-codes';
import { Controller } from "../decorators/controller.decorator";
import { Get } from "../decorators/router.decorator";
import { SKUService } from "../services/sku/sku.service";
@Controller('/api/sku')
@Service()
export default class SKUController {
    constructor(private skuService: SKUService) { }

    @Get('/')
    async get(req: Request, res: Response) {
        try {
            const id  = req.query.id as string
            if(!id) {throw new Error( `${StatusCodes.BAD_REQUEST}:- SKU ID is missing!!`)}
            const result = await this.skuService.findStockLevel(id)
            res.send({ data: result })
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message })
        }
    }


}