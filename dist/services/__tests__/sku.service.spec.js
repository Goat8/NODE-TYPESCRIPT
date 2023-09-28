"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sku_repository_1 = require("../../models/sku/sku.repository");
const sku_service_1 = require("../sku/sku.service");
const typedi_1 = require("typedi");
// Mock the SKURepository
jest.mock('../../models/sku/sku.repository', () => {
    return {
        SKURepository: jest.fn().mockImplementation(() => {
            return {
                fetchStockBySKU: jest.fn().mockResolvedValue({ stock: 10 }),
                fetchTransactionsBySKU: jest.fn().mockResolvedValue([{ qty: 3 }, { qty: 2 }]),
            };
        }),
    };
});
describe('SKUService', () => {
    it('should calculate stock level correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create a mock instance of SKURepository
        const mockSKURepository = {
            stockFileName: "testStock.json",
            transactionFileName: "testTransaction.json",
            fetchStockBySKU: jest.fn().mockResolvedValue({ stock: 10 }),
            fetchTransactionsBySKU: jest.fn().mockResolvedValue([{ qty: 3 }, { qty: 2 }]),
        };
        // Use Container.set to override the injection with the mock instance
        typedi_1.Container.set(sku_repository_1.SKURepository, mockSKURepository);
        // Create a new instance of SKUService
        const skuService = new sku_service_1.SKUService(mockSKURepository);
        // Call the method being tested
        const result = yield skuService.findStockLevel('ABC123');
        // Assert the result
        expect(result).toBe(5);
    }));
    // Add more test cases...
});
