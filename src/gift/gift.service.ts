import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { GiftCard } from 'src/models/giftCard.model';
import { PremiumPlan } from 'src/models/premiumPlans.model';


function genPass() {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = lowercase.toUpperCase();
  const digits = "0123456789";

  const allChars = lowercase + uppercase + digits;

  let key = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    key += allChars.charAt(randomIndex);
  }

  return key;
}



@Injectable()
export class GiftService {
  async create(data: CreateGiftDto) {


    const premium = await PremiumPlan.findByPk(data.premiumId);

    if (premium) {
      let bulk_data = []; data.createCount
      for (let i = 0; i < data.createCount; i++) {
        let code = genPass();

        bulk_data.push({
          code: code,
          is_active: false,
          premiumId: data.premiumId
        })

      }

      const plans = await GiftCard.bulkCreate(bulk_data, { returning: ['code'] });


      return { plans }
    }

    throw new UnprocessableEntityException();

  }

  async findAll(sort, is_active) {
    let s_by = 'createdAt';
    let s = 'ASC'
    if (sort) {
      s_by = sort.split("-")[0];
      s = sort.split("-")[1];
    }
    let gift;
    if (typeof is_active === 'undefined') {
      gift = await GiftCard.findAll({ order: [[`${s_by}`, `${s}`]] });
    } else {
      // console.log(is_active)
      gift = await GiftCard.findAll({ where: { is_active: is_active }, order: [[`${s_by}`, `${s}`]] });
    }

    return { gift };
  }

  async findOne(id: number) {
    const premium = await PremiumPlan.findAll();
    const gift = await GiftCard.findByPk(id);
    return { gift, premium };
  }


  // async remove(id: number) {
  //   const gift = await GiftCard.findByPk(id);
  //   gift.destroy();
  //   return;
  // }
}
