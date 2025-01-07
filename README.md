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

## `apps/ex-app`
### 直接执行
```
pnpm --filter "ex-app" run debug
```

### 构建后执行
```
pnpm --filter "utils" run build
pnpm --filter "ex-app" run build
node .\apps\ex-app\dist\index.js
```