import { SKURepository } from '../../models/sku/sku.repository';
import { TransactionType } from '../../types/sku.type';
import { SKUService } from '../sku/sku.service';
import { Container } from 'typedi';
describe('SKUService', () => {
    it('should calculate stock level correctly', async () => {
        const mockSKURepository = {
          stockFileName:"testStock.json", 
          transactionFileName:"testTransaction.json",
          fetchStockBySKU: jest.fn().mockResolvedValue({ stock: 10 }),
          fetchTransactionsBySKU: jest.fn().mockResolvedValue([{ qty: 3,type:TransactionType.ORDER }, { qty: 2, type:TransactionType.REFUND }]),
        };
    
        Container.set(SKURepository, mockSKURepository);
        const skuService = new SKUService(mockSKURepository);
        const result = await skuService.findStockLevel('ABC123');
            expect(result).toBe(9);
      });

      it('should calculate stock level correctly for all refund transactions', async () => {
        const mockSKURepository = {
          stockFileName:"testStock.json", 
          transactionFileName:"testTransaction.json",
          fetchStockBySKU: jest.fn().mockResolvedValue({ stock: 10 }),
          fetchTransactionsBySKU: jest.fn().mockResolvedValue([{ qty: 3,type:TransactionType.REFUND }, { qty: 2, type:TransactionType.REFUND }]),
        };
    
        Container.set(SKURepository, mockSKURepository);
        const skuService = new SKUService(mockSKURepository);
        const result = await skuService.findStockLevel('ABC123');
            expect(result).toBe(15);
      });

      it('should calculate stock level correctly for all order by transactions', async () => {
        const mockSKURepository = {
          stockFileName:"testStock.json", 
          transactionFileName:"testTransaction.json",
          fetchStockBySKU: jest.fn().mockResolvedValue({ stock: 10 }),
          fetchTransactionsBySKU: jest.fn().mockResolvedValue([{ qty: 3,type:TransactionType.ORDER }, { qty: 2, type:TransactionType.ORDER }]),
        };
    
        Container.set(SKURepository, mockSKURepository);
        const skuService = new SKUService(mockSKURepository);
        const result = await skuService.findStockLevel('ABC123');
            expect(result).toBe(5);
      });

      it('should throw error if no stock found', async () => {
        const mockSKURepository = {
          stockFileName:"testStock.json", 
          transactionFileName:"testTransaction.json",
          fetchStockBySKU: jest.fn().mockResolvedValue(undefined),
          fetchTransactionsBySKU: jest.fn().mockResolvedValue([]),
        };
    
        Container.set(SKURepository, mockSKURepository);
        const skuService = new SKUService(mockSKURepository);
      
        try {
            await skuService.findStockLevel('ABC');
            fail('Expected an error to be thrown');
        } catch (error:any) {
            expect(error.message).toBe('No Stock Found against ABC');
        }
      });

      it('should throw error if no transaction found', async () => {
        const mockSKURepository = {
          stockFileName:"testStock.json", 
          transactionFileName:"testTransaction.json",
          fetchStockBySKU: jest.fn().mockResolvedValue({ stock: 10 }),
          fetchTransactionsBySKU: jest.fn().mockResolvedValue([]),
        };
    
        Container.set(SKURepository, mockSKURepository);
        const skuService = new SKUService(mockSKURepository);
      
        try {
            await skuService.findStockLevel('ABC');
            fail('Expected an error to be thrown');
        } catch (error:any) {
            expect(error.message).toBe('No Transaction Found against ABC');
        }
      });
});
