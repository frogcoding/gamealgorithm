/*
给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
你可以假设 nums1 和 nums2 不会同时为空。
*/

//在真实的游戏开发中，往往在战力排序中，需要用到有序数组的合并算法，例如玩家宠物战力排行，每个人可能有多个宠物，自己的宠物战力是由排行的，那么可能会出现玩家和玩家需要进行宠物战力排行，那么问题就可以
//抽象成为了两个有序数组的合并排序。

//至于找到中间数，也就很好理解，即战力的一种平均表现的计算方式。
//v1: 153 ms
var findMedianSortedArraysV1 = function(nums1, nums2) {
    var arr = nums1.concat(nums2).sort((a, b)=>{return (a-b)});
    let len = arr.length;
    if(len %2 == 0) {
        return (arr[len /2] + arr[len /2 -1])/2
    }else {
       return arr[Math.floor(len /2)]
    }
};


//v2: 137ms
var findMedianSortedArraysV2 = function(nums1, nums2) {

    if( null == nums1 || null == nums2)
        return 0.0;

        //O(n)
        var combineTwoSortedArray = function (nums1, nums2) {
            var tmp = [];
            var maxArray = [], minArray = [];
            //找到maxarray, minArray
            if(nums1.length > nums2.length) {
                maxArray = nums1;
                minArray = nums2; 
            }
            else {
                maxArray = nums2;
                minArray = nums1; 
            }
            var m = 0, n = 0;
            for(var i = 0; i < maxArray.length + minArray.length; i++) {
                if(n >= minArray.length) {
                    tmp[i] = maxArray[m];
                    m++;
                }
                else {
                    if(maxArray[m] < minArray[n]) {
                        tmp[i] = maxArray[m];
                        m++;
                    }        
                    else {
                        tmp[i] = minArray[n];
                        n++;
                    }
                }
              
            }
        
            return tmp;
        }

        //第一步合并两个有序数组
        var midArray = combineTwoSortedArray(nums1, nums2);
        //判断合成后的长度，如果是奇数
        if(midArray.length%2 == 0) {//偶

            var m = midArray.length/2 - 1;
            var n = midArray.length/2;
            return (midArray[m] + midArray[n])/2;
        }
        else {//奇
            var n = Math.floor(midArray.length/2);
            return (midArray[n]);
        }
    
    

}

//v3: 96ms
var findMedianSortedArraysV3 = function(nums1, nums2) {
    
    let len1 = nums1.length;
    let len2 = nums2.length;
    if(len2<len1){
        return findMedianSortedArraysV3(nums2,nums1);
    }
    let i,j;
    let iMin = 0, iMax = len1;
    
    while(iMin <= iMax){
        i = Math.floor((iMin+iMax)/2);
        j = Math.floor((len1+len2+1)/2-i);
        if(nums1[i-1]>nums2[j] && i!=0 && j!=len2){
            iMax = i-1;   
        }
        else if(nums2[j-1]>nums1[i] && i!=len1 && j!=0){
            iMin = i+1;
        }
        else{
            let lMax, rMin
            if(i==0){lMax = nums2[j-1];}
            else if(j==0){lMax = nums1[i-1];}
            else{lMax = Math.max(nums1[i-1],nums2[j-1]);}
            if((len1+len2)%2!=0){
                return lMax;
            }
            if(i==len1){rMin = nums2[j];}
            else if(j==len2){rMin = nums1[i];}
            else{rMin = Math.min(nums1[i],nums2[j]);}
            return (lMax + rMin)/2;
        }
    }

    
    

};

var nums1 = [1,3];
var nums2 = [2];

var retValue = findMedianSortedArraysV2(nums1, nums2);

console.log(retValue);