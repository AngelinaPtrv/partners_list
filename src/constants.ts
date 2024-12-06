import { partners } from '@/data/data.ts'
import type { IPartner } from '@/interfaces.ts'

type Transformer = (partner: IPartner) => string
type ArrayTransformer = (partner: IPartner) => Array<string>

const extractor = (transformer: Transformer) => {
  const allElements: Array<string> = partners.map((partner: IPartner) => transformer(partner))
  const uniqueElements: Set<string> = new Set(allElements)
  return [...uniqueElements]
}

const flattener = (transformer: ArrayTransformer) => {
  const allElements: Array<string> = partners.reduce((acc: Array<string>, partner: IPartner) => {
    transformer(partner).map((item: string): void => {
      acc.push(item)
    })
    return acc
  }, [])
  const uniqElements: Set<string> = new Set(allElements)
  return [...uniqElements]
}
export const uniqueCountries: Array<string> = extractor((partner: IPartner) => partner.country)
export const uniqueCities: Array<string> = extractor((partner: IPartner) => partner.city)
export const uniqueProductTypes: Array<string> = extractor(
  (partner: IPartner) => partner.productType,
)
export const uniqueProducts: Array<string> = flattener((partner: IPartner) => partner.products)
export const uniquePartnerTypes: Array<string> = flattener(
  (partner: IPartner) => partner.partnerType,
)
