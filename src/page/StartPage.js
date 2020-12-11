// 开始页面
import { defineComponent, h } from "@vue/runtime-core";
import startPageImg from "../../assets/startPage.jpg";
import startBtnImg from "../../assets/startBtn.png";

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
      h("Sprite", { texture: startPageImg }),
      h("Sprite", {
        texture: startBtnImg,
        x: 251,
        y: 550,
        interactive: true,
        onClick: ctx.onClick,
      }),
    ]);
  },
});
