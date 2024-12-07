<script setup lang="ts">
import { usePartnersStore } from '@/stores/partners.ts'
import { ref } from 'vue'
import { partners } from '@/data/data.ts'
import type { IFilter } from '@/interfaces.ts'

const PLACEHOLDER_VALUE: string = ''
const partnersList = usePartnersStore()

const filters = ref<IFilter>({ country: PLACEHOLDER_VALUE, city: PLACEHOLDER_VALUE })
const selectedPartners = ref<Array<string>>([])

const selectPartner = (partner: string = ''): void => {
  if (selectedPartners.value.includes(partner)) {
    selectedPartners.value.splice(selectedPartners.value.indexOf(partner), 1)
  } else {
    selectedPartners.value.push(partner)
  }
  filters.value.partnerType = [...selectedPartners.value]
}

const clear = (): void => {
  partnersList.setPartnersList(partners)
  filters.value = { country: PLACEHOLDER_VALUE, city: PLACEHOLDER_VALUE }
  selectedPartners.value = []
}
const filterList = (): void => {
  partnersList.filterPartnersList(filters.value)
}
</script>

<template>
  <div class="filters">
    <div class="filters-block">
      <div class="filters__subscription" style="margin-bottom: 30px">Уточните адрес</div>
      <select
        class="form-select filters__select"
        style="margin-bottom: 16px"
        v-model="filters.country"
      >
        <option :value="PLACEHOLDER_VALUE" disabled selected>Страна</option>
        <option
          v-for="country in partnersList.countriesList"
          :key="country.name"
          :value="country.name"
          :disabled="country.disabled"
        >
          {{ country.name }}
        </option>
      </select>
      <select class="form-select filters__select" v-model="filters.city">
        <option :value="PLACEHOLDER_VALUE" disabled selected>Город</option>
        <option
          v-for="city in partnersList.citiesList"
          :key="city.name"
          :value="city.name"
          :disabled="city.disabled"
        >
          {{ city.name }}
        </option>
      </select>
    </div>
    <div class="filters-block">
      <div class="filters__subscription">Выберите тип продукта</div>
      <div class="btn-group filters-block__buttons" role="group">
        <button
          v-for="type in partnersList.productTypes"
          :key="type.name"
          type="button"
          class="btn bg-secondary filters__chips"
          :class="{ active: filters.productType === type.name }"
          @click="filters.productType = type.name"
          :disabled="type.disabled"
        >
          {{ type.name }}
        </button>
      </div>
    </div>
    <div class="filters-block">
      <div class="filters__subscription">Выберите продукт</div>
      <div class="btn-group filters-block__buttons" role="group">
        <button
          v-for="product in partnersList.products"
          :key="product.name"
          type="button"
          class="btn bg-secondary filters__chips"
          :class="{ active: filters.product === product.name }"
          @click="filters.product = product.name"
          :disabled="product.disabled"
        >
          {{ product.name }}
        </button>
      </div>
    </div>
    <div class="filters-block">
      <div class="filters__subscription">Выберите тип партнера</div>
      <div class="btn-group filters-block__buttons" role="group">
        <button
          v-for="partner in partnersList.partnerTypes"
          :key="partner.name"
          type="button"
          class="btn bg-secondary filters__chips"
          :class="{ active: selectedPartners.includes(partner.name) }"
          @click="selectPartner(partner.name)"
          :disabled="partner.disabled"
        >
          {{ partner.name }}
        </button>
      </div>
    </div>
    <div class="filters-actions">
      <button
        type="button"
        class="btn btn-outline-dark filters-actions__button filters-actions__button--outlined"
        @click="clear"
      >
        Очистить
      </button>
      <button
        type="button"
        class="btn filters-actions__button filters-actions__button--filled bg-info"
        @click="filterList"
      >
        Найти
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filters {
  max-width: 368px;
  &__subscription {
    font-size: 14px;
    color: #9999a2;
    margin-bottom: 16px;
  }
  &-block {
    margin-bottom: 30px;
    &__buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;

      .btn.active {
        background-color: #26263a !important;
        color: #ffffff;
      }
    }
  }
  &__chips {
    border-radius: 30px !important;
    line-height: 17px;
    padding: 7px 16px;
    max-width: fit-content;
    font-size: 14px;
  }
  &-actions {
    margin-top: 42px;
    &__button {
      border-radius: 4px;
      line-height: 22px;
      &--outlined {
        border-width: 2px;
        padding: 13px 48px;
        margin-right: 9px;
      }
      &--filled {
        color: #ffffff;
        padding: 14px 48px;
      }
    }
  }
}
</style>
