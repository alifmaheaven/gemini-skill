#!/bin/bash
# check_status.sh - Comprehensive system and Kubernetes status report

echo "=== System Uptime ==="
uptime

echo ""
echo "=== CPU & Memory Usage ==="
free -h
top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print "CPU Usage: " 100-$1 "%"}'

echo ""
echo "=== Disk Usage ==="
df -h | grep -E '^/dev/' | grep -v 'loop'

echo ""
echo "=== Firewall Status (UFW) ==="
sudo ufw status numbered

echo ""
echo "=== Kubernetes Node Status ==="
kubectl get nodes -o wide

echo ""
echo "=== Kubernetes Pod Status (Anomalies Only) ==="
kubectl get pods -A | awk 'NR==1 || ($4 != "Running" && $4 != "Completed")' | head -n 30

echo ""
echo "=== Kubernetes LoadBalancer Services ==="
kubectl get svc -A | grep LoadBalancer || echo "No LoadBalancer services found."

echo ""
echo "=== Recent System Errors (Journalctl) ==="
sudo journalctl -p err -n 10 --no-pager
