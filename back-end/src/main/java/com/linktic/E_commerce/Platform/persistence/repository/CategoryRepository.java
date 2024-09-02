package com.linktic.E_commerce.Platform.persistence.repository;

import com.linktic.E_commerce.Platform.persistence.entity.Category;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CategoryRepository {

    @Select("select * from CATEGORIA")
    List<Category> getAllCategory();

    @Insert("insert into CATEGORIA(nombre, estado) values(#{category.nombre}, #{category.estado})")
    int saveNewCategory(@Param("category") Category category);

    @Update("update CATEGORIA set nombre = #{category.nombre} where id = #{id}")
    int updateCategory(@Param("id") int id, @Param("category") Category category);

    @Update("update CATEGORIA set estado = #{estado} where id = #{id}")
    int updateStateByCategory(@Param("id") int id, @Param("estado") boolean estado);
}
