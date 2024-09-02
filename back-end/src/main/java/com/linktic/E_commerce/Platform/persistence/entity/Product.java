package com.linktic.E_commerce.Platform.persistence.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    private Long id;
    private String nombre;
    private Double precio;
    private int cantidad;
    private Boolean estado;
    private int categoria;
    private String image;
    private String descripcion;
}
