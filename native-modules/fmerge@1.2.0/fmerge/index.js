;(function(root) {
if(typeof exports === 'object') {
	module.exports = merge
} else {
	root.merge = merge
}

function merge(a, b /*, ...args */) {
	var args = Array.prototype.slice.call(arguments, 2)

	var out = {}
	Object.keys(a || {}).forEach(function(key) {
		out[key] = copy(a[key])
	})
	Object.keys(b || {}).forEach(function(key) {
		var val = b[key]
		// We only want to do this for actual objects
		// Any falsy type is not an actual object (0, '', null, any array, etc)
		if(val
		&& typeof(val) == 'object'
		&& !Array.isArray(val)
		&& a && a[key]
		&& typeof(a[key]) == 'object'
		) {
			val = merge(a[key], val)
		} else {
			val = copy(val)
		}
		out[key] = val
	})
	if(args.length) {
		args.unshift(out)
		out = merge.apply(null, args)
	}
	return out
}

	function copy(val) {
		if(Array.isArray(val)) {
			return val.map(copy)
		}
		if(val && typeof(val) == 'object') {
			return merge(val)
		}
		return val
	}
}(this))
