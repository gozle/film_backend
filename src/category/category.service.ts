import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from 'src/models/category.model';

@Injectable()
export class CategoryService {
  async create(data: CreateCategoryDto) {
    await Category.create({
      name: data.name,
      parentId: data.parentId,
    })
  }

  async findAll(sort: string) {

    let s_by = 'createdAt';
    let s = 'ASC'
    if (sort) {
      s_by = sort.split("-")[0];
      s = sort.split("-")[1];
    }

    const categories = await Category.findAll({ order: [[`${s_by}`, `${s}`]] });

    return categories;
  }

  async findOne(id: number) {
    const category = await Category.findByPk(id);

    let pl = category.get({ plain: true });
    if (pl.parentId) {
      pl['parent'] = await Category.findByPk(pl.parentId, { attributes: ['id', 'name'] })
    }

    return category;
  }

  async update(id: number, data: UpdateCategoryDto) {

    try {

      const category = await Category.findByPk(id);
      category.update({
        name: data.name,
        parentId: data.parentId
      })

      return;
    }
    catch (err) {
      throw err;
    }
  }

  async remove(id: number) {
    try {
      const category = await Category.findByPk(id);
      const children = await Category.findAll({ where: { parentId: category.id } })
      children.map(async child => {
        await child.update({ parentId: null });
      })
      category.destroy();
      return;
    } catch (err) {
      throw err;
    }
  }
}
