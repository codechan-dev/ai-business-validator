# Docker Build Troubleshooting Guide

## Issue: ReadTimeoutError from PyPI

**Error Message:**
```
pip._vendor.urllib3.exceptions.ReadTimeoutError: HTTPSConnectionPool(host='files.pythonhosted.org', port=443): Read timed out.
```

**Cause:** PyPI servers timing out during pip package downloads

**Solution Applied:** ✅ Updated Dockerfile with:
- Longer timeout (1000 seconds)
- Retry logic (5 attempts)
- Reliable PyPI index URL

---

## 🔧 Fixed Dockerfile

The Dockerfile now includes:
```dockerfile
RUN pip install --no-cache-dir \
    --index-url https://pypi.org/simple/ \
    --default-timeout=1000 \
    --retries 5 \
    -r requirements.txt
```

**What this does:**
- `--default-timeout=1000` - Waits up to 1000 seconds per package
- `--retries 5` - Retries up to 5 times if download fails
- `--index-url https://pypi.org/simple/` - Uses official PyPI mirror
- `--no-cache-dir` - Saves space in Docker image

---

## ✅ Try Building Again

```bash
docker build -t ai-validator:latest .
```

**Expected output:**
- Should progress through package downloads
- Takes 2-5 minutes (first time)
- Subsequent builds are faster

---

## 🆘 If Build Still Fails

### Option 1: Use Alternative PyPI Mirror
```bash
docker build --build-arg PIP_INDEX_URL=https://mirrors.aliyun.com/pypi/simple/ \
  -t ai-validator:latest .
```

### Option 2: Pre-install Packages on Host
```bash
# Install packages locally first
pip install -r requirements.txt

# Then build Docker image (will use local cache)
docker build -t ai-validator:latest .
```

### Option 3: Build with Increased Docker Build Timeout
```bash
# Linux/Mac
docker build --progress=plain -t ai-validator:latest .

# Windows PowerShell
docker build --progress=plain -t ai-validator:latest .
```

### Option 4: Use Docker BuildKit (Faster)
```bash
# Enable BuildKit
export DOCKER_BUILDKIT=1

# Or on Windows PowerShell
$env:DOCKER_BUILDKIT=1

# Then build
docker build -t ai-validator:latest .
```

---

## 📊 Common PyPI Mirrors

If you need to use an alternative mirror:

**Official PyPI (Recommended):**
```
https://pypi.org/simple/
```

**Aliyun (China):**
```
https://mirrors.aliyun.com/pypi/simple/
```

**Tsinghua University (China):**
```
https://pypi.tuna.tsinghua.edu.cn/simple
```

**Huawei (China):**
```
https://mirrors.huaweicloud.com/repository/pypi/simple
```

**Usage:**
```bash
docker build --build-arg PIP_INDEX_URL=https://mirrors.aliyun.com/pypi/simple/ \
  -t ai-validator:latest .
```

---

## 🚀 After Build Succeeds

```bash
# Start services
docker-compose up

# Access
API:  http://localhost:8001/docs
UI:   http://localhost:8501
```

---

## 💡 Prevention Tips

### 1. Build During Off-Peak Hours
PyPI is slower during peak times. Try building at:
- Late evening
- Early morning
- Weekend

### 2. Check Internet Connection
```bash
# Test connectivity
ping -c 3 pypi.org
curl https://pypi.org/simple/
```

### 3. Increase Docker's Resources
Docker Desktop → Settings → Resources:
- Memory: 4GB+
- CPUs: 2+
- Disk: 10GB+

### 4. Use BuildKit for Better Performance
```bash
export DOCKER_BUILDKIT=1
docker build -t ai-validator:latest .
```

### 5. Clean Docker Cache if Needed
```bash
docker builder prune
docker system prune -a
```

---

## 📝 What Changed in Dockerfile

**Before:**
```dockerfile
RUN pip install --no-cache-dir -r requirements.txt
```

**After:**
```dockerfile
RUN pip install --no-cache-dir \
    --index-url https://pypi.org/simple/ \
    --default-timeout=1000 \
    --retries 5 \
    -r requirements.txt
```

**Benefits:**
- ✅ Handles slow network
- ✅ Automatic retries
- ✅ Explicit PyPI URL
- ✅ Longer timeout period

---

## 🎯 Next Steps

1. **Clean up previous builds:**
   ```bash
   docker system prune -a
   ```

2. **Try building again:**
   ```bash
   docker build -t ai-validator:latest .
   ```

3. **Monitor progress:**
   Watch for "Successfully installed" message

4. **Verify build success:**
   ```bash
   docker images | grep ai-validator
   ```

5. **Start services:**
   ```bash
   docker-compose up
   ```

---

## 📞 Still Having Issues?

If build still times out:

1. **Check network:**
   ```bash
   ping pypi.org
   ```

2. **Try alternative mirror:**
   ```bash
   docker build --build-arg PIP_INDEX_URL=https://mirrors.aliyun.com/pypi/simple/ \
     -t ai-validator:latest .
   ```

3. **Enable BuildKit:**
   ```bash
   export DOCKER_BUILDKIT=1
   docker build -t ai-validator:latest .
   ```

4. **Try later:**
   PyPI might be experiencing issues. Wait 1-2 hours and try again.

---

**The updated Dockerfile is now more robust and should handle timeouts gracefully!** ✅
