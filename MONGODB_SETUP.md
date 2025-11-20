# 🚨 CRITICAL: MongoDB Atlas Setup Required

## ❌ Current Issue:
Your backend is crashing because `MONGO_URI` is using a placeholder:
```
mongodb+srv://rakshithganjimut_db_user:ndiFIC9eaO8umX7R@cluster0.xxxxx.mongodb.net/shophub
```

The `xxxxx` needs to be replaced with your actual MongoDB Atlas cluster address.

## ✅ Solution: Set Up MongoDB Atlas (FREE - 5 minutes)

### Step 1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google or email
3. Choose **FREE M0 cluster** (512MB)
4. Select cloud provider: **AWS**
5. Region: Choose closest to you
6. Cluster name: `Cluster0` (default is fine)
7. Click **Create Cluster**

### Step 2: Create Database User
1. In Atlas dashboard, go to **Security > Database Access**
2. Click **Add New Database User**
3. Authentication Method: **Password**
4. Username: `rakshithganjimut_db_user`
5. Password: `ndiFIC9eaO8umX7R` (or generate new one)
6. Database User Privileges: **Read and write to any database**
7. Click **Add User**

### Step 3: Configure Network Access
1. Go to **Security > Network Access**
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (for Vercel serverless)
4. This adds `0.0.0.0/0` (required for Vercel)
5. Click **Confirm**

### Step 4: Get Connection String
1. Go to **Deployment > Database**
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Driver: **Node.js**
5. Version: **5.5 or later**
6. Copy the connection string - it will look like:
   ```
   mongodb+srv://rakshithganjimut_db_user:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 5: Update Connection String
Your connection string should look like this (replace `abc123` with your actual cluster ID):
```
mongodb+srv://rakshithganjimut_db_user:ndiFIC9eaO8umX7R@cluster0.abc123.mongodb.net/shophub?retryWrites=true&w=majority
```

**Important:**
- Replace `<password>` with `ndiFIC9eaO8umX7R`
- Replace `abc123` with your actual cluster subdomain (e.g., `mongo.net`, `aws.mongodb.net`)
- Add `/shophub` before the `?` to specify database name

### Step 6: Update Vercel Environment Variable

Run this command with YOUR actual connection string:
```bash
cd backend
vercel env rm MONGO_URI production
vercel env add MONGO_URI production
# Paste your full connection string when prompted
vercel --prod
```

## 📝 Quick Fix Commands:

```powershell
# 1. Remove old MongoDB URI
cd backend
vercel env rm MONGO_URI production

# 2. Add new MongoDB URI (paste YOUR connection string when asked)
vercel env add MONGO_URI production

# 3. Redeploy backend
vercel --prod
```

## ✅ Example Valid Connection Strings:

```
mongodb+srv://rakshithganjimut_db_user:ndiFIC9eaO8umX7R@cluster0.mongo.net/shophub?retryWrites=true&w=majority

mongodb+srv://rakshithganjimut_db_user:ndiFIC9eaO8umX7R@cluster0.w1abc.mongodb.net/shophub?retryWrites=true&w=majority
```

## 🔍 How to Find Your Cluster Address:

In MongoDB Atlas:
1. Click **Connect** on your cluster
2. The address is in the connection string between `@` and `/`
3. Example: `cluster0.w1abc.mongodb.net`

## ⚠️ Common Mistakes:

❌ `@cluster0.xxxxx.mongodb.net` - Placeholder, won't work
❌ `@cluster0.mongodb.net` - Missing subdomain
❌ Missing password in the URL
❌ Missing database name `/shophub`

✅ `@cluster0.w1abc.mongodb.net/shophub` - Correct format

---

**Once you have the correct connection string, let me know and I'll update it for you!**
