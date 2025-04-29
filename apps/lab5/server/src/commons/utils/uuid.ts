declare global {
  export type Uuid<TBrand = undefined> = string & { _uuidBrand: TBrand }
}

export const isUuid = <TBrand = undefined>(
  val: string,
): val is Uuid<TBrand> => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  return val.match(uuidRegex).length > 0
}
