// 结束页面
import { defineComponent, h } from "@vue/runtime-core";
import endPageImg from "../../assets/endPage.jpg";
import restartBtnImg from "../../assets/restartBtn.png";

export default defineComponent({
  setup(props, { emit }) {
    const onClick = () => {
      emit("changePage", "GamePage");
    };

    return {
      onClick,
    };
  },
  render(ctx) {
    // 图片
    // <div><img src="imgPage"></div>
    // pixi.js
    return h("Container", [
      h("Sprite", { texture: endPageImg }),
      h("Sprite", {
        texture: restartBtnImg,
        x: 251,
        y: 550,
        interactive: true,
        onClick: ctx.onClick,
      }),
    ]);
  },
});
