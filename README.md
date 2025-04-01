# Bonsai Dashboard 书签管理器

一个美观的 Chrome 新标签页扩展，让您的书签管理更加优雅高效。

![Bonsai Dashboard 预览](./preview.png)

## ✨ 特性

- 🎯 将新标签页变成您的个性化书签仪表板
- 🔍 快速搜索所有书签
- 🖼️ 自动显示网站图标，界面简洁美观
- 📂 按文件夹分类展示书签
- 🌓 深色主题界面
- ⚡ 快速访问常用网站

## 📦 安装指南

### 方法一：本地安装（推荐）

1. 下载此仓库的代码：
   - 点击页面上方的绿色 "Code" 按钮
   - 选择 "Download ZIP"
   - 解压下载的文件

2. 打开 Chrome 扩展页面：
   - 在浏览器地址栏输入 `chrome://extensions/`
   - 或者点击 Chrome 菜单 > 更多工具 > 扩展程序

3. 启用开发者模式：
   - 在扩展页面右上角找到"开发者模式"开关
   - 将其打开

4. 加载扩展：
   - 点击左上角的"加载已解压的扩展程序"按钮
   - 选择解压后的 `dist` 文件夹
   - 确认加载

5. 完成！
   - 打开新标签页即可看到您的书签仪表板
   - 扩展图标会出现在 Chrome 工具栏中

### 方法二：从源码构建

如果您想自己构建扩展，请按以下步骤操作：

1. 确保已安装 Node.js (v16+)

2. 克隆仓库：
```bash
git clone https://github.com/happiepillsg/Bonsai.git
cd Bonsai
```

3. 安装依赖：
```bash
npm install
```

4. 构建项目：
```bash
npm run build
```

5. 按照上述"本地安装"的步骤 2-5 进行安装

## 🔧 使用说明

- 打开新标签页时会自动显示您的书签仪表板
- 使用顶部搜索栏快速查找书签
- 点击书签图标直接访问对应网站
- 书签会按照 Chrome 中的文件夹结构自动分类显示

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建一个 Pull Request

## 📝 注意事项

- 扩展仅获取必要的书签权限，保护您的隐私
- 所有数据都存储在本地，不会上传到任何服务器
- 如遇到问题，可以尝试禁用后重新启用扩展

## 📄 开源协议

本项目采用 MIT 协议 - 查看 [LICENSE](LICENSE) 文件了解详情 