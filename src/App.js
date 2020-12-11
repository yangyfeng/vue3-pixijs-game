// 根组件
import { defineComponent, h, ref, computed } from "@vue/runtime-core";
import StartPage from "./page/StartPage";
import GamePage from "./page/GamePage";
import EndPage from "./page/EndPage";

export default defineComponent({
  setup() {
    // const currentPageName = ref("StartPage");
    const currentPageName = ref("GamePage");
    // const currentPageName = ref("EndPage");

    const currentPage = computed(() => {
      if (currentPageName.value === "StartPage") {
        return StartPage;
      } else if (currentPageName.value === "GamePage") {
        return GamePage;
      } else if (currentPageName.value === "EndPage") {
        return EndPage;
      }
    });

    return {
      currentPageName,
      currentPage,
    };
  },

  render(ctx) {
    debugger;
    return h("Container", [
      h(ctx.currentPage, {
        onChangePage(page) {
          ctx.currentPageName = page;
        },
      }),
    ]);
    // return h("Container", [h(GamePage)]);
  },
});
