//import { Injectable } from 'typedi';
import { Service, Inject, Container } from "typedi";
import fs from 'fs';
import * as path from 'path';
import { Stock, Transaction } from "../../types/sku.type";


@Service()
export class SKURepository {
  public  stockFileName= "stock.json";
  public transactionFileName = "transactions.json";

  /**
   * read stock file and return its filtered data
   * @param sku 
   * @returns {Promise<Stock> }
   */
 public async fetchStockBySKU(sku: string): Promise<Stock> {
    try {
      const filePath = path.join(__dirname,'..','..','..','src','models','sku' ,this.stockFileName);
      const stocks = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return stocks.find((stock:{sku:string})=> stock.sku===sku);
    } catch (error) {
      throw new Error('Error reading and parsing JSON file: ' + error);
    }
  }

  /**
   * read transaction file and return its filtered data
   * @param sku 
   * @returns 
   */
 public async fetchTransactionsBySKU(sku: string): Promise<Transaction[]> {
    try {
      const filePath = path.join(__dirname,'..','..','..','src','models','sku' ,this.transactionFileName);
      const transactions = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return  transactions.filter((transaction:{sku:string})=> transaction.sku===sku)
    } catch (error) {
      throw new Error('Error reading and parsing JSON file: ' + error);
    }
  }

}