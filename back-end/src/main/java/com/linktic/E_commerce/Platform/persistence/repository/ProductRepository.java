package com.linktic.E_commerce.Platform.persistence.repository;

import com.linktic.E_commerce.Platform.persistence.entity.Product;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ProductRepository {

    @Select("select * from PRODUCTO")
    List<Product> getAllProducts();

    @Insert("insert into PRODUCTO (nombre, precio, cantidad, estado, categoria, image, descripcion) " +
            "values (#{product.nombre}, #{product.precio}, #{product.cantidad}, #{product.estado}, #{product.categoria}, " +
            "#{product.image}, #{product.descripcion})")
    int saveNewProduct(@Param("product") Product product);

    @Update("update PRODUCTO set nombre = #{product.nombre}, precio = #{product.precio}, cantidad = #{product.cantidad}, " +
            "categoria = #{product.categoria}, image = #{product.image}, " +
            "descripcion = #{product.descripcion} where id= #{id}")
    int updateCategory(@Param("id") int id, @Param("product") Product product);

    @Update("update PRODUCTO set estado = #{estado} where id= #{id}")
    int updateStateByCategory(@Param("id") int id, @Param("estado") boolean estado);
}
