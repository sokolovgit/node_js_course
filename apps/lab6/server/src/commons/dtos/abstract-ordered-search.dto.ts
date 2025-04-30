import {
  EnumFieldOptional,
  NumberFieldOptional,
  StringFieldOptional,
} from "../decorators/field.decorators"
import { Order } from "../types/order.type"

export class AbstractOrderedSearchDto {
  @EnumFieldOptional(() => Order, {
    default: Order.ASC,
  })
  readonly order: Order = Order.ASC

  @NumberFieldOptional({
    minimum: 1,
    default: 1,
    int: true,
  })
  readonly page: number = 1

  @NumberFieldOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
    int: true,
  })
  readonly take: number = 10

  get skip(): number {
    return (this.page - 1) * this.take
  }

  @StringFieldOptional()
  readonly q?: string
}
