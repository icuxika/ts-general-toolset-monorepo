# Monorepo 项目的搭建

### 根项目添加模块及子模块添加对其他子模块的依赖

```
pnpm add -w -D typescript ts-node @types/node
cd .\apps\ex-app\
pnpm add @ts-general-toolset-monorepo/utils
pnpm run debug
```

### 代码格式化检查

```
pnpm run lint
```

### 代码提交

```
git add .
pnpm run cm
```
