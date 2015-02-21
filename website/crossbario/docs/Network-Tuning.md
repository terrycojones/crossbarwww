Linux TCP networking is tuned as in the following. This (or similar) is *required*, since we are really pushing the system.

Add the following to the end of `/etc/sysctl.conf` and do `sysctl -p`:

	net.core.somaxconn = 8192
	net.ipv4.tcp_max_orphans = 8192
	net.ipv4.tcp_max_syn_backlog = 8192
	net.core.netdev_max_backlog = 262144
	
	net.ipv4.ip_local_port_range = 1024 65535
	
	#net.ipv4.tcp_low_latency = 1
	#net.ipv4.tcp_window_scaling = 0
	#net.ipv4.tcp_syncookies = 0
	
	fs.file-max = 16777216
	fs.pipe-max-size = 134217728

Further system level tuning:

Modify `/etc/security/limits.conf` for the following

	# wildcard does not work for root, but for all other users
	*               soft     nofile           1048576
	*               hard     nofile           1048576
	# settings should also apply to root
	root            soft     nofile           1048576
	root            hard     nofile           1048576

and add the following line

	session required pam_limits.so

to both of these files at the end:

	/etc/pam.d/common-session
	/etc/pam.d/common-session-noninteractive

Reboot (or at least I don't know how to make it immediate without reboot).

Check that you actually got large (`1048576`) FD limit:

	ulimit -n

Probably also check that above `sysctl` settings actually are in place (`sysctl -a | grep ..` or such). I am paranoid.

FIXME: Twisted backlog.

http://lzone.de/Debian+Ubuntu+ulimit+Check+List