---
name: system-monitor
description: Monitor system health, Kubernetes cluster status, and firewall configuration. Use when you need a comprehensive overview of server resources, crashing pods, or network security status.
---

# System Monitor

This skill provides a comprehensive overview of the server's health, focusing on system resources (CPU, RAM, Disk), firewall status, and Kubernetes cluster health.

## Core Capabilities

- **System Uptime & Load**: Quickly check how long the server has been running and its current load.
- **Resource Usage**: Detailed reports on memory, CPU percentage, and disk space.
- **Firewall Status**: Detailed view of UFW rules and active state.
- **Kubernetes Health**:
    - Detailed node status (version, internal/external IP).
    - Summary of problematic pods (those NOT in 'Running' or 'Completed' status).
    - LoadBalancer service overview to identify exposed ports.
- **Recent Errors**: Quick look at the last 10 system-level error messages via journalctl.

## Usage Guide

Run the following script to get the full report:

```bash
/root/gemini-skill/system-monitor/scripts/check_status.sh
```

### Troubleshooting Anomalies

When the report shows pods in `CrashLoopBackOff` or `ImagePullBackOff`, investigate using:
1. `kubectl logs <pod-name> -n <namespace>`
2. `kubectl describe pod <pod-name> -n <namespace>`

When resource usage is high:
1. Identify top processes using `top -o %MEM` or `top -o %CPU`.
2. Check for disk space exhaustion with `df -h`.
