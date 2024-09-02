package com.linktic.E_commerce.Platform.service;

import com.linktic.E_commerce.Platform.persistence.entity.Category;
import com.linktic.E_commerce.Platform.persistence.repository.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategory() throws Exception {
        List<Category> categories = new ArrayList<>();
        try {
            categories = categoryRepository.getAllCategory();
        } catch (Exception e) {
            log.error("{}:{}", Thread.currentThread().getStackTrace()[1].getMethodName(), e.getMessage());
            throw new Exception("error getting all categories ", e);
        }
        return categories;
    }

    public int saveNewCategory(Category category) throws Exception {
        int rows = 0;
        category.setEstado(true);
        try {
            rows = categoryRepository.saveNewCategory(category);
        } catch (Exception e) {
            log.error("{}:{}", Thread.currentThread().getStackTrace()[1].getMethodName(), e.getMessage());
            throw new Exception("error saving category ", e);
        }
        return rows;
    }

    public int updateCategory(int id, Category category) throws Exception {
        int rows = 0;
        if (category.getEstado() == null) {
            try {
                rows = categoryRepository.updateCategory(id, category);
            } catch (Exception e) {
                log.error("{}:{}", Thread.currentThread().getStackTrace()[1].getMethodName(), e.getMessage());
                throw new Exception("error updating category", e);
            }
        } else {
            try {
                rows = categoryRepository.updateStateByCategory(id, !category.getEstado());
            } catch (Exception e) {
                log.error("{}:{}", Thread.currentThread().getStackTrace()[1].getMethodName(), e.getMessage());
                throw new Exception("error updating category status", e);
            }
        }
        return rows;
    }
}
