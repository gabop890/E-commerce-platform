package com.linktic.E_commerce.Platform.service;

import com.linktic.E_commerce.Platform.persistence.entity.Product;
import com.linktic.E_commerce.Platform.persistence.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() throws Exception {
        List<Product> products = new ArrayList<>();
        try {
            products = productRepository.getAllProducts();
        } catch (Exception e) {
            log.error("{}:{}", Thread.currentThread().getStackTrace()[1].getMethodName(), e.getMessage());
            throw  new Exception("Error al obtener todos los productos", e);
        }
        return products;
    }

    public int saveNewProduct(Product product) throws Exception {
        int rows = 0;
        product.setEstado(true);
        try {
            rows = productRepository.saveNewProduct(product);
        } catch (Exception e) {
            log.error("{}:{}", Thread.currentThread().getStackTrace()[1].getMethodName(), e.getMessage());
            throw new Exception("error saving product ", e);
        }
        return rows;
    }

    public int updateProduct(int id, Product product) throws Exception {
        int rows = 0;
        if (product.getEstado() == null) {
            try {
                rows = productRepository.updateCategory(id, product);
            } catch (Exception e) {
                log.error("{}:{}", Thread.currentThread().getStackTrace()[1].getMethodName(), e.getMessage());
                throw new Exception("error updating category", e);
            }
        } else {
            try {
                rows = productRepository.updateStateByCategory(id, !product.getEstado());
            } catch (Exception e) {
                log.error("{}:{}", Thread.currentThread().getStackTrace()[1].getMethodName(), e.getMessage());
                throw new Exception("error updating category status", e);
            }
        }
        return rows;
    }
}
