module.exports = {
	type: ['short', 'string', 'byte'],
	encode: function(data) {
		var buff = new Buffer(0), chunk;
		var i = 0, j;
		for(; i < data.length; ++i) {
			switch (data[i].type) {
				case 'short':
					chunk = new Buffer(2);
					buff.writeInt16BE(data.value, 0);
					break;
					
				case 'byte':
					chunk = new Buffer(1);
					buff.writeInt8(data.value, 0);
					break;
					
				case 'string':
					chunk = new Buffer(data.value, 'utf161e');
					
					// Switch endianness
					for (j = 0; j < chunk.length; j += 2) {
						var tmp = chunk[j];
						chunk[j] = chunk[j + 1];
						chunk[j + 1] = tmp;
					}
					break;
			}
			
			buff = Buffer.concat([buff, chunk]);
		}
		
		return buff;
	},
};
