import { Injectable } from '@nestjs/common';
import { CreatePremiumDto } from './dto/create-premium.dto';
import { UpdatePremiumDto } from './dto/update-premium.dto';
import { PremiumPlan } from 'src/models/premiumPlans.model';

@Injectable()
export class PremiumService {
  async create(data: CreatePremiumDto) {

    await PremiumPlan.create({
      name: data.name,
      description: data.description,
      duration: data.duration,
      price: data.price,
      device_count: data.device_count,
    })

    return;

  }

  async findAll() {
    const plans = await PremiumPlan.findAll()
    return { plans };
  }

  async findOne(id: number) {
    const plans = await PremiumPlan.findByPk(id)
    return { plans };
  }

  async update(id: number, data: UpdatePremiumDto) {

    const plan = await PremiumPlan.findByPk(id);
    await plan.update({
      name: data.name,
      description: data.description,
      duration: data.duration,
      price: data.price,
      device_count: data.device_count,
    })

    return;

  }
  async remove(id: number) {
    const plan = await PremiumPlan.findByPk(id)

    await plan.destroy();
    return;
  }
}
