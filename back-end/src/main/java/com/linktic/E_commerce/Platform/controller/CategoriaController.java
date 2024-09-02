package com.linktic.E_commerce.Platform.controller;

import com.linktic.E_commerce.Platform.model.ServiceResponse;
import com.linktic.E_commerce.Platform.persistence.entity.Category;
import com.linktic.E_commerce.Platform.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/category")
public class CategoriaController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/allcategory")
    private List<Category> getAllCategory() {
        List<Category> categories = new ArrayList<>();
        try {
            categories = categoryService.getAllCategory();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return categories;
    }

    @PostMapping("/save")
    private ResponseEntity<ServiceResponse> saveCategoty(@RequestBody Category category) {
        int rows = 0;
        ServiceResponse serviceResponse = new ServiceResponse();
        try {
            rows = categoryService.saveNewCategory(category);
            if (rows == 1) {
                serviceResponse.setMessage("The category was saved successfully");
                serviceResponse.setSuccess(true);
            } else {
                serviceResponse.setMessage("The category was not saved successfully");
                serviceResponse.setSuccess(false);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    private ResponseEntity<ServiceResponse> updateCategory(@PathVariable int id, @RequestBody Category category) {
        int rows = 0;
        ServiceResponse serviceResponse = new ServiceResponse();
        try {
            rows = categoryService.updateCategory(id, category);
            if (rows == 1) {
                serviceResponse.setMessage("The category was updated successfully");
                serviceResponse.setSuccess(true);
            } else {
                serviceResponse.setMessage("The category was not updated successfully");
                serviceResponse.setSuccess(false);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
}
