import {
  DragDropDriver,
  MouseClickDriver,
  MouseMoveDriver,
  ViewportResizeDriver,
  ViewportScrollDriver,
  KeyboardDriver,
} from './drivers'
import {
  useCursorEffect,
  useViewportEffect,
  useDragDropEffect,
  useSelectionEffect,
  useResizeEffect,
  useKeyboardEffect,
  useAutoScrollEffect,
  useWorkspaceEffect,
  useFreeSelectionEffect,
  useContentEditableEffect,
  useTranslateEffect,
} from './effects'
import {
  SelectNodes,
  SelectAllNodes,
  SelectSameTypeNodes,
  DeleteNodes,
  CopyNodes,
  PasteNodes,
  UndoMutation,
  RedoMutation,
  CursorSwitchSelection,
  PreventCommandX,
  SelectPrevNode,
  SelectNextNode,
} from './shortcuts'
/**
 * 预设的副作用（和宿主环境有交互的操作）处理集合
 * 封装 应用所需要处理的 effects
 */
export const DEFAULT_EFFECTS = [
  /**
   * 自由选择
   */
  useFreeSelectionEffect,
  /**
   * 光标行为 悬浮等
   */
  useCursorEffect,
  /**
   * 视窗调整
   */
  useViewportEffect,
  /**
   * 拖拽行为
   */
  useDragDropEffect,
  /**
   * 选中行为
   */
  useSelectionEffect,
  /**
   * 键盘输入
   */
  useKeyboardEffect,
  /**
   * // TODO 待验证
   * 自动滚动的行为--拖动组件到视窗边缘时 视窗可能会滚动
   */
  useAutoScrollEffect,
  /**
   * 工作空间 -> 多工作空间情况下需要在每次节点组件变化或者选中的情况下都监测当前的workspace是哪个
   */
  useWorkspaceEffect,
  /**
   * DOM节点编辑 -> 单击/双击
   */
  useContentEditableEffect,
  /**
   * 组件移动
   */
  useTranslateEffect,
  /**
   * 缩放节点组件
   */
  useResizeEffect,
]
/**
 * 预设驱动 -> 封装 宿主环境的交互事件的注册
 */
export const DEFAULT_DRIVERS = [
  MouseMoveDriver,
  DragDropDriver,
  MouseClickDriver,
  ViewportResizeDriver,
  ViewportScrollDriver,
  KeyboardDriver,
]
/**
 * 快捷操作定义 -> 与上下文交互
 * 依赖键盘驱动
 */
export const DEFAULT_SHORTCUTS = [
  PreventCommandX,
  SelectNodes,
  SelectAllNodes,
  SelectSameTypeNodes,
  DeleteNodes,
  CopyNodes,
  PasteNodes,
  SelectPrevNode,
  SelectNextNode,
  UndoMutation,
  RedoMutation,
  CursorSwitchSelection,
]
