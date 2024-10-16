import { BaseServices } from "./baseServices";
import SliderShema from "../models/SliderShema";

export class SliderServices<ISliderCollection>
  implements BaseServices<ISliderCollection>
{
  async getAll(): Promise<ISliderCollection[]> {
    const findCollection =
      (await SliderShema.find().lean()) as ISliderCollection[];
    return findCollection.length ? findCollection : [];
  }
}
