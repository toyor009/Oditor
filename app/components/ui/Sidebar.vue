<template>
  <aside
    class="bg-white border-r border-[#ededed] flex flex-col items-center text-sm transition-all"
    :class="isCollapsed ? 'w-20' : 'w-68'"
  >
    <div
      class="h-dvh py-6 flex flex-col justify-between"
      :class="isCollapsed ? 'w-10' : 'w-58'"
    >
      <div class="w-full">
        <!-- Top Section -->
        <div class="mb-10 h-8 relative flex items-center justify-between">
          <!-- Logo -->
          <NuxtImg v-if="isCollapsed" src="/images/logo-2.png" class="w-8" />
          <NuxtImg v-else src="/images/logo-1.png" class="w-22 ml-3" />

          <!-- Expand/Collapsed Toggle -->
          <UButton
            variant="ghost"
            :class="
              isCollapsed
                ? 'absolute z-10 -right-11 bg-white border border-[#ededed]'
                : ''
            "
            :title="isCollapsed ? 'Expand' : 'Collapse'"
            @click="toggleSidebar"
          >
            <UIcon
              :name="
                isCollapsed
                  ? 'i-custom-sidebar-toggle-callepsed'
                  : 'i-custom-sidebar-toggle-expanded'
              "
              :size="isCollapsed ? 12 : 16"
            />
          </UButton>
        </div>

        <!-- Menu Items -->
        <ul class="sidebar-menu space-y-4">
          <li v-for="menu in NAV_MENU">
            <UButton
              variant="ghost"
              class="h-10 w-full flex gap-2 text-soft font-medium first"
              :to="menu.route"
              :title="isCollapsed ? menu.title : ''"
            >
              <component
                :is="menuIcons[menu.id]"
                :active="isActiveMenu(menu.id)"
                active-color="#0094a1"
              />

              <span
                v-if="!isCollapsed"
                :class="isActiveMenu(menu.id) ? 'text-primary' : ''"
              >
                {{ menu.title }}
              </span>
            </UButton>
          </li>
        </ul>
      </div>

      <!-- Log Out -->
      <UButton
        variant="ghost"
        leading-icon="i-custom-log-out"
        class="w-full text-soft font-medium"
        :label="isCollapsed ? '' : 'Log out'"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import HomeIcon from "~/components/icons/Home.vue";
import BagIcon from "~/components/icons/Bag.vue";
import ReceiptIcon from "~/components/icons/Receipt.vue";
import UsersIcon from "~/components/icons/Users.vue";
import WalletIcon from "~/components/icons/Wallet.vue";
import CogIcon from "~/components/icons/Cog.vue";

import { NAV_MENU } from "~/utils/constants";

import type { AppRouteId } from "~/types/generic";

const props = defineProps<{
  pageId: AppRouteId;
}>();

const menuIcons: Record<AppRouteId, any> = {
  home: HomeIcon,
  products: BagIcon,
  sales: ReceiptIcon,
  customers: UsersIcon,
  subscriptions: WalletIcon,
  settings: CogIcon,
};

const isCollapsed = ref(false);

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value;
}

function isActiveMenu(menuId: string) {
  return props.pageId === menuId;
}
</script>

<style scoped>
.sidebar-menu {
  li:first-of-type {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #e6e6e6;
  }

  li:last-of-type {
    padding-top: 1rem;
    margin-top: 1rem;
    border-top: 1px solid #e6e6e6;
  }
}
</style>
