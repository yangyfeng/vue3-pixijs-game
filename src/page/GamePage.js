// 游戏页面
import {
  defineComponent,
  h,
  reactive,
  onMounted,
  onUnmounted,
} from "@vue/runtime-core";
import Map from "../components/Map";
import Plane from "../components/Plane";
import EnemyPlane from "../components/EnemyPlane";
import Bullet from "../components/Bullet";
import { game } from "../Game";
import { hitTestObject } from "../utils";

export default defineComponent({
  setup(_, { emit }) {
    // 我方战机
    const { planeInfo } = usePlane();
    // 敌军逻辑
    const { enemyPlanes, moveEnemyPlanes } = useEnemyPlanes();
    // 子弹逻辑
    const { bullets, moveBullets, addBullet } = useBullets();
    // 战斗的逻辑
    useFighting(moveEnemyPlanes, moveBullets, enemyPlanes, planeInfo, emit, bullets);

    const handleAttack = (info) => {
      addBullet(info);
    };
    return {
      bullets,
      enemyPlanes,
      planeInfo,
      handleAttack,
    };
  },
  render(ctx) {
    const createBullets = () => {
      return ctx.bullets.map((info) => {
        return h(Bullet, { x: info.x, y: info.y });
      });
    };

    const createEnemyPlanes = () => {
      return ctx.enemyPlanes.map((info) => {
        return h(EnemyPlane, { x: info.x, y: info.y });
      });
    };

    return h("Container", [
      h(Map),
      h(Plane, {
        x: ctx.planeInfo.x,
        y: ctx.planeInfo.y,
        onAttack: ctx.handleAttack,
      }),
      ...createEnemyPlanes(),
      ...createBullets(),
    ]);
  },
});

function useFighting(moveEnemyPlanes, moveBullets, enemyPlanes, planeInfo, emit, bullets) {
  const handleTicker = () => {
    // 游戏 主循环
    // 敌军移动
    moveEnemyPlanes();

    // 移动我方子弹
    moveBullets();

    // 检测碰撞
    enemyPlanes.forEach((enemy) => {
      if (hitTestObject(enemy, planeInfo)) {
        console.log("hit");
        // game over
        emit("changePage", "EndPage");
      }
    });

    // 敌方飞机和我方子弹的碰撞检测
    enemyPlanes.forEach((enemy, enemyIndex) => {
      bullets.forEach((bullet, bulletIndex) => {
        if (hitTestObject(enemy, bullet)) {
          enemyPlanes.splice(enemyIndex, 1);
          bullets.splice(bulletIndex, 1);
        }
      });
    });
  };
  onMounted(() => {
    game.ticker.add(handleTicker);
  });
  onUnmounted(() => {
    game.ticker.remove(handleTicker);
  });
}

// 我方子弹逻辑
function useBullets() {
  const bullets = reactive([]);

  const moveBullets = () => {
    bullets.forEach((bullet) => {
      bullet.y--;
    });
  };

  const addBullet = (info) => {
    bullets.push({ ...info, width: 61, height: 99 });
  };

  return {
    bullets,
    moveBullets,
    addBullet,
  };
}

// 敌方飞机
function useEnemyPlanes() {
  // 单一职责
  const enemyPlanes = reactive([{ x: 10, y: 10, width: 208, height: 207 }]);

  const moveEnemyPlanes = () => {
    enemyPlanes.forEach((enemy) => {
      enemy.y++;
    });
  };

  return {
    enemyPlanes,
    moveEnemyPlanes,
  };
}

// 我方飞机逻辑
function usePlane() {
  const planeInfo = reactive({ x: 100, y: 400, width: 258, height: 364 });
  // 按下键盘的时候回移动飞机
  const speed = 10;
  window.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "ArrowUp":
        planeInfo.y -= speed;
        break;
      case "ArrowDown":
        planeInfo.y += speed;
        break;
      case "ArrowLeft":
        planeInfo.x -= speed;
        break;
      case "ArrowRight":
        planeInfo.x += speed;
        break;
    }
  });
  return { planeInfo };
}
