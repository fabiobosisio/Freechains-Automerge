#!/bin/bash
echo "Info de hora atual e tempo que o computador esta ligado:"
uptime

echo "Apagando as cadeias..."
echo "Node 1"
rm -rf /home/pi/servers/node1/chains/$crdt
PID=$! #catch the last PID, here from command1
wait $PID #wait for command1, in background, to end
echo "Node 2"
rm -rf /home/pi/servers/node2/chains/$crdt
PID=$! #catch the last PID, here from command1
wait $PID #wait for command1, in background, to end
echo "Node 3"
rm -rf /home/pi/servers/node3/chains/$crdt
PID=$! #catch the last PID, here from command1
wait $PID #wait for command1, in background, to end
echo "Node 4"
rm -rf /home/pi/servers/node4/chains/$crdt
PID=$! #catch the last PID, here from command1
wait $PID #wait for command1, in background, to end

echo "Iniciando as cadeias..."
echo "Node 1"
freechains --host=localhost:8330 chains join '$crdt' 96700ACD1128035FFEF5DC264DF87D5FEE45FF15E2A880708AE40675C9AD039E
PID=$! #catch the last PID, here from command1
wait $PID #wait for command1, in background, to end
echo "Node2"
freechains --host=localhost:8331 chains join '$crdt' 96700ACD1128035FFEF5DC264DF87D5FEE45FF15E2A880708AE40675C9AD039E
PID=$! #catch the last PID, here from command1
wait $PID #wait for command1, in background, to end
echo "Node 3"
freechains --host=localhost:8332 chains join '$crdt' 96700ACD1128035FFEF5DC264DF87D5FEE45FF15E2A880708AE40675C9AD039E
PID=$! #catch the last PID, here from command1
wait $PID #wait for command1, in background, to end
echo "Node 4"
freechains --host=localhost:8333 chains join '$crdt' 96700ACD1128035FFEF5DC264DF87D5FEE45FF15E2A880708AE40675C9AD039E
PID=$! #catch the last PID, here from command1
wait $PID #wait for command1, in background, to end
