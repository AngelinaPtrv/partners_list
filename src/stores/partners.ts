import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { partners } from '@/data/data.ts'
import type { IPartner } from '@/data/data.ts'

export const usePartnersStore = defineStore('partners', () => {
  const partnersList = ref<IPartner[]>([])

  const countriesList = computed((): Array<string> => {
    const countriesArray: Array<string> = partners.map((partner: IPartner) => partner.country)
    const uniqCountries: Set<string> = new Set(countriesArray)
    return [...uniqCountries]
  })

  const citiesList = computed((): Array<string> => {
    const citiesArray: Array<string> = partners.map((partner: IPartner) => partner.city)
    const uniqCities: Set<string> = new Set(citiesArray)
    return [...uniqCities]
  })

  const productTypes = computed((): Array<string> => {
    const typesArray: Array<string> = partners.map((partner: IPartner) => partner.productType)
    const uniqTypes: Set<string> = new Set(typesArray)
    return [...uniqTypes]
  })

  const products = computed((): Array<string> => {
    const productsArray: Array<string> = partners.reduce(
      (acc: Array<string>, partner: IPartner) => {
        partner.products.map((item: string): void => {
          acc.push(item)
        })
        return acc
      },
      [],
    )
    const uniqProducts: Set<string> = new Set(productsArray)
    return [...uniqProducts]
  })

  const partnerTypes = computed((): Array<string> => {
    const partnersArray: Array<string> = partners.reduce(
      (acc: Array<string>, partner: IPartner) => {
        partner.partnerType.map((item: string): void => {
          acc.push(item)
        })
        return acc
      },
      [],
    )
    const uniqTypes: Set<string> = new Set(partnersArray)
    return [...uniqTypes]
  })

  function setPartnersList(payload: Array<IPartner>): void {
    partnersList.value = payload
  }

  function filterPartnersList({
    country,
    city,
    productType,
    product,
    partnerType,
  }: {
    country?: string
    city?: string
    productType?: string
    product?: string
    partnerType?: Array<string>
  }): void {
    console.log(arguments)
    partnersList.value = partners.filter(
      (partner: IPartner) =>
        (!country || partner.country === country) &&
        (!city || partner.city === city) &&
        (!productType || partner.productType === productType) &&
        (!product || partner.products.includes(product)) &&
        (!partnerType ||
          !partnerType.length ||
          partner.partnerType.some((el: string) => partnerType.includes(el))),
    )
  }

  return {
    partnersList,
    countriesList,
    citiesList,
    productTypes,
    products,
    partnerTypes,
    setPartnersList,
    filterPartnersList,
  }
})
