package com.linktic.E_commerce.Platform.controller;

import com.linktic.E_commerce.Platform.model.ServiceResponse;
import com.linktic.E_commerce.Platform.persistence.entity.Category;
import com.linktic.E_commerce.Platform.persistence.entity.Product;
import com.linktic.E_commerce.Platform.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/producto")
public class ProductoController {

    @Autowired
    private ProductService productService;

    @GetMapping("/allproductos")
    private List<Product> getAllProducts(){
        List<Product> products = new ArrayList<>();
        try {
            products = productService.getAllProducts();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return products;
    }

    @PostMapping("/save")
    private ResponseEntity<ServiceResponse> saveProduct(@RequestBody Product product) {
        int rows = 0;
        ServiceResponse serviceResponse = new ServiceResponse();
        try {
            rows = productService.saveNewProduct(product);
            if (rows == 1) {
                serviceResponse.setMessage("The product was saved successfully");
                serviceResponse.setSuccess(true);
            } else {
                serviceResponse.setMessage("The product was not saved successfully");
                serviceResponse.setSuccess(false);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    private ResponseEntity<ServiceResponse> updateProduct(@PathVariable int id, @RequestBody Product product) {
        int rows = 0;
        ServiceResponse serviceResponse = new ServiceResponse();
        try {
            rows = productService.updateProduct(id, product);
            if (rows == 1) {
                serviceResponse.setMessage("The product was updated successfully");
                serviceResponse.setSuccess(true);
            } else {
                serviceResponse.setMessage("The product was not updated successfully");
                serviceResponse.setSuccess(false);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
}
