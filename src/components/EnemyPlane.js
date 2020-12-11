// 敌方飞机
import { defineComponent, h, ref, toRefs } from "@vue/runtime-core";
import planeImg from "../../assets/enemy.png";

export default defineComponent({
  props: ["x", "y"],
  //   setup(props) {

  //     // 响应式对象丢失的问题
  //     const { x, y } = toRefs(props);
  //     console.log(x, y);
  //     return {
  //       x,
  //       y,
  //     };
  //   },
  render(ctx) {
    return h("Container", { x: ctx.x, y: ctx.y }, [
      h("Sprite", { texture: planeImg }),
    ]);
  },
});
