<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { usePartnersStore } from '@/stores/partners.ts'
import { partners } from '@/data/data.ts'

const partnersStore = usePartnersStore()

const partnersList = computed(() => {
  return partnersStore.partnersList
})

const getImageUrl = (logo: string) => {
  switch (logo) {
    case 'ALGRUM':
      return new URL('../assets/images/algum.png', import.meta.url).href
    case 'EcoPack':
      return new URL('../assets/images/ecopack.jpeg', import.meta.url).href
    case 'SecureIT':
      return ''
  }
}

onMounted(() => {
  partnersStore.setPartnersList(partners)
})
</script>

<template>
  <div v-if="!partnersList.length">Партнеры не найдены</div>
  <ul v-else class="list-group list-group-flush">
    <li
      v-for="partner in partnersList"
      :key="partner.id"
      class="list-group__item d-flex align-items-start justify-content-between"
    >
      <img :src="getImageUrl(partner.logo)" width="102" />
      <div class="item-description">
        <div class="item-description__name">{{ partner.name }}</div>
        <div class="d-flex justify-content-between">
          <span class="item-description__info">{{ partner.phone }}</span>
          <span class="item-description__info">{{ partner.email }}</span>
          <a
            :href="`http://${partner.website}`"
            class="link-info item-description__info"
            target="_blank"
            >{{ partner.website }}</a
          >
        </div>
      </div>
      <span
        class="badge"
        :class="partner.status.toLowerCase() === 'premier' ? 'text-bg-dark' : 'badge--grey'"
        >{{ partner.status }}</span
      >
    </li>
  </ul>
</template>

<style scoped lang="scss">
.list-group {
  max-width: 856px;
  li:not(:first-child) {
    padding: 42px 0;
  }
  li:first-child {
    padding-bottom: 42px;
  }
  &__item {
    gap: 42px;
    border-bottom: 1px solid #ccccd1;
  }
  .item-description {
    min-width: 481px;
    &__name {
      color: #000000;
      font-family: 'Gogh-bold', sans-serif;
      font-size: 20px;
      padding-bottom: 24px;
    }
    &__info {
      font-family: 'Gogh-regular', sans-serif;
      color: #000000;
    }
  }

  .badge--grey {
    background-color: #9999a2;
    color: #ffffff;
  }
}
</style>
