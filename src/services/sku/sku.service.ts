import "reflect-metadata";
import { SKURepository } from "../../models/sku/sku.repository";
import { Service, Inject, Container } from "typedi";

@Service()
export class SKUService {
  private skuRepo: SKURepository;

  constructor(@Inject() skuRepo: SKURepository){
      this.skuRepo = skuRepo
  }

  /**
   * this method takes sku id and 
   * @param sku 
   */
 public async findStockLevel(sku:string): Promise<number>  {
  const stock = await this.skuRepo.fetchStockBySKU(sku);
  const transactions = await this.skuRepo.fetchTransactionsBySKU(sku);

  if(!stock){
    throw new Error(`No Stock Found against ${sku}`);
  }
  if(!transactions?.length){
    throw new Error(`No Transaction Found against ${sku}`);
  }
  const {stock:qty} = stock;
  const totalQuantity = transactions.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.qty;
  }, 0);

   return qty-totalQuantity
  };
}