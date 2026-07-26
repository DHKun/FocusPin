# FocusPin

桌面小组件:在一个可置顶的毛玻璃窗口里记待办和灵感。单一上下文。

## Language

**待办 (Todo)**:
用户要完成的一件事,带完成态。
_Avoid_: Task

**灵感 (Inspiration)**:
用户随手记下的一段文字,没有状态。
_Avoid_: Idea(只作 UI 标题显示)、Note

**条目 (Item)**:
待办与灵感的统称。
_Avoid_: Entry、Record

**Pin (置顶)**:
用户手动开关的窗口置顶状态,开启后应用表现为桌面小组件。
_Avoid_: Always-on-top(只在与 Tauri API 对话时使用)

**Store**:
应用全部用户数据的唯一持久化入口。
_Avoid_: localStorage、直接读写文件
