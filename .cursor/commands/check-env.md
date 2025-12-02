# 检查环境变量脚本

检查给定的env文件中的环境变量是否准备就绪。

## 脚本位置

`./tools/check-env.sh`

## 使用方法

```bash
./tools/check-env.sh <env_file_path> <var1> [var2] ... [varN]
```

## 参数说明

- `env_file_path` - 要检查的.env文件路径
- `var1, var2, ...` - 要检查的环境变量名（一个或多个）

## 示例

### 检查单个变量

```bash
./tools/check-env.sh .env DATABASE_URL
```

### 检查多个变量

```bash
./tools/check-env.sh backend/.env DATABASE_URL API_KEY SECRET_KEY
```

### 检查前端环境变量

```bash
./tools/check-env.sh frontend/.env REACT_APP_API_URL REACT_APP_AUTH_KEY
```

## 输出说明

- ✓ 绿色：变量已配置且有值
- ✗ 红色：变量未找到
- ⚠ 黄色：变量存在但值为空

脚本会在检查失败时返回非零退出码，便于在CI/CD流程中使用。

