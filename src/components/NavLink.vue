<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

const attrs = useAttrs();

const isRouterLink = computed(() => 'to' in attrs);
const isAnchorLink = computed(() => 'href' in attrs);

const linkStyle = "text-sky-600/80 hover:underline font-semibold";

</script>
<template>
  <span>

    <router-link v-if="isRouterLink" v-bind="$attrs" :class="linkStyle">
      <slot></slot>
    </router-link>

    <a v-else-if="isAnchorLink" v-bind="$attrs" :class="linkStyle">
      <slot></slot>
    </a>

    <span v-else v-bind="$attrs" :class="linkStyle">
      <slot></slot>
    </span>
  </span>
</template>
