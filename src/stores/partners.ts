import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { partners } from '@/data/data.ts'
import type { IPartner, IOption } from '@/interfaces.ts'
import {
  uniqueCities,
  uniqueCountries,
  uniquePartnerTypes,
  uniqueProducts,
  uniqueProductTypes,
} from '@/constants.ts'

export const usePartnersStore = defineStore('partners', () => {
  const partnersList = ref<Array<IPartner>>([])

  const countriesList = computed((): Array<IOption> => {
    const selectedCountries: Array<string> = partnersList.value.map(
      (partner: IPartner) => partner.country,
    )
    const selectedUniqueCountries: Set<string> = new Set(selectedCountries)
    return uniqueCountries.map((country: string) => ({
      name: country,
      disabled: !selectedUniqueCountries.has(country),
    }))
  })

  const citiesList = computed((): Array<IOption> => {
    const selectedCities: Array<string> = partnersList.value.map(
      (partner: IPartner) => partner.city,
    )
    const selectedUniqueCities: Set<string> = new Set(selectedCities)
    return uniqueCities.map((city: string) => ({
      name: city,
      disabled: !selectedUniqueCities.has(city),
    }))
  })

  const productTypes = computed((): Array<IOption> => {
    const selectedTypes: Array<string> = partnersList.value.map(
      (partner: IPartner) => partner.productType,
    )
    const selectedUniqueTypes: Set<string> = new Set(selectedTypes)
    return uniqueProductTypes.map((type: string) => ({
      name: type,
      disabled: !selectedUniqueTypes.has(type),
    }))
  })

  const products = computed((): Array<IOption> => {
    const selectedProducts: Array<string> = partnersList.value.reduce(
      (acc: Array<string>, partner: IPartner) => {
        partner.products.map((item: string): void => {
          acc.push(item)
        })
        return acc
      },
      [],
    )
    const uniqueSelectedProducts: Set<string> = new Set(selectedProducts)
    return uniqueProducts.map((product: string) => ({
      name: product,
      disabled: !uniqueSelectedProducts.has(product),
    }))
  })

  const partnerTypes = computed((): Array<IOption> => {
    const selectedPartnerTypes: Array<string> = partnersList.value.reduce(
      (acc: Array<string>, partner: IPartner) => {
        partner.partnerType.map((item: string): void => {
          acc.push(item)
        })
        return acc
      },
      [],
    )
    const uniqueSelectedPartnerTypes: Set<string> = new Set(selectedPartnerTypes)
    return uniquePartnerTypes.map((type: string) => ({
      name: type,
      disabled: !uniqueSelectedPartnerTypes.has(type),
    }))
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
