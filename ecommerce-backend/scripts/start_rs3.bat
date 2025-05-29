@echo off
cd /d %~dp0
echo Starting MongoDB Secondary node (rs3)...
mongod --dbpath "..\mongo-replica\rs3" --port 27119 --replSet rs0 --bind_ip localhost
