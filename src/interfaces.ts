export interface IPartner {
  id: number
  logo: string
  name: string
  phone: string
  email: string
  website: string
  status: string
  country: string
  city: string
  productType: string
  products: Array<string>
  partnerType: Array<string>
}

export interface IFilter {
  country?: string
  city?: string
  productType?: string
  product?: string
  partnerType?: Array<string>
}

export interface IOption {
  name: string
  disabled: boolean
}
