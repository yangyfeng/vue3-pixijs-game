// 我方飞机
import { defineComponent, h, ref, toRefs } from "@vue/runtime-core";
import planeImg from "../../assets/plane.png";

export default defineComponent({
  props: ["x", "y"],
  setup(props, { emit }) {
    window.addEventListener("keydown", (e) => {
      // 按下空格的时候发射子弹
      if (e.code === "Space") {
        emit("attack", {
          x: props.x + 100,
          y: props.y,
        });
      }
    });
  },
  render(ctx) {
    return h("Container", { x: ctx.x, y: ctx.y }, [
      h("Sprite", { texture: planeImg }),
    ]);
  },
});
